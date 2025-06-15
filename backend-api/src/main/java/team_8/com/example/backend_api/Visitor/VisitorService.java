package team_8.com.example.backend_api.Visitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import team_8.com.example.backend_api.Contributor.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;

@Service
public class VisitorService {

    private final VisitorRepository visitorRepository;
    ///used for upgrade account
    private final ContributorRepository contributorRepository;
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Autowired
    public VisitorService(VisitorRepository visitorRepository, ContributorRepository contributorRepository) {
        this.visitorRepository = visitorRepository;
        this.contributorRepository = contributorRepository;
    }

    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    public Visitor getVisitorById(Long id) {
        return visitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor not found with id: " + id));
    }

    public Visitor createVisitor(Visitor visitor) {
        // Add any validation or business logic before saving
        return visitorRepository.save(visitor);
    }

    public Visitor updateVisitor(Long id, Visitor visitorDetails) {
        Visitor visitor = visitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor not found with id: " + id));

        // Update common User fields
        visitor.setDisplayName(visitorDetails.getDisplayName());
        visitor.setUsername(visitorDetails.getUsername());
        visitor.setEmail(visitorDetails.getEmail());
        visitor.setBio(visitorDetails.getBio());
        visitor.setLocation(visitorDetails.getLocation());
        visitor.setWebsite(visitorDetails.getWebsite());
        visitor.setProfilePicturePath(visitorDetails.getProfilePicturePath());
        visitor.setFollowing(visitorDetails.getFollowing());

        // Update Visitor-specific fields
        visitor.setAccountAge(visitorDetails.getAccountAge());
        visitor.setPostsReads(visitorDetails.getPostsReads());
        visitor.setCanUpgradeAccount(visitorDetails.canUpgradeAccount());

        return visitorRepository.save(visitor);
    }

    public void deleteVisitor(Long id) {
        if (!visitorRepository.existsById(id)) {
            throw new RuntimeException("Visitor not found with id: " + id);
        }
        visitorRepository.deleteById(id);
    }

    public Contributor upgradeAccount(Long id) {
        // Fetch visitor and gather necessary data and following ids in current transaction
        Visitor visitor = visitorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Visitor not found with id: " + id));

        if (!visitor.canUpgradeAccount()) {
            throw new RuntimeException("Visitor is not eligible for account upgrade");
        }

        // capture attributes
        String profilePicturePath = visitor.getProfilePicturePath();
        String displayName = visitor.getDisplayName();
        String username = visitor.getUsername();
        String email = visitor.getEmail();
        String bio = visitor.getBio();
        String location = visitor.getLocation();
        String website = visitor.getWebsite();

        Set<Long> followingIds = visitor.getFollowing()
            .stream()
            .map(team_8.com.example.backend_api.Contributor.Contributor::getId)
            .collect(java.util.stream.Collectors.toSet());

        // Phase 1: delete visitor in its own transaction
        deleteVisitorInNewTx(visitor);

        // Phase 2: create contributor in new transaction and restore relationships
        return createContributorInNewTx(profilePicturePath, displayName, username, email, bio, location, website, followingIds);
    }

    @Transactional
    void deleteVisitorInNewTx(Visitor visitor) {
        // detach following first to avoid FK constraints
        visitor.getFollowing().clear();
        visitorRepository.save(visitor);
        visitorRepository.delete(visitor);
    }

    @Transactional
    Contributor createContributorInNewTx(String profilePicturePath, String displayName, String username, String email,
                                         String bio, String location, String website, Set<Long> followingIds) {
        Contributor contributor = new Contributor(profilePicturePath, displayName, username, email, bio, location, website);
        contributor.setTotalViews(0);
        contributor.setTotalLikes(0);
        Contributor saved = contributorRepository.save(contributor);

        for (Long followedId : followingIds) {
            contributorRepository.findById(followedId).ifPresent(followed -> {
                saved.followContributor(followed);
                followed.addFollower(saved);
                contributorRepository.save(followed);
            });
        }
        return contributorRepository.save(saved);
    }
    

    // Optional: Additional methods for finding visitors by specific criteria
    public Optional<Visitor> getVisitorByUsername(String username) {
        return visitorRepository.findByUsername(username);
    }

    public Optional<Visitor> getVisitorByEmail(String email) {
        return visitorRepository.findByEmail(email);
    }
} 