package team_8.com.example.backend_api.Visitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team_8.com.example.backend_api.Contributor.*;

import java.util.List;
import java.util.Optional;

@Service
public class VisitorService {

    private final VisitorRepository visitorRepository;
    ///used for upgrade account
    private final ContributorRepository contributorRepository; 
    
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
        Visitor visitor = visitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor not found with id: " + id));
        
        if (!visitor.canUpgradeAccount()) {
            throw new RuntimeException("Visitor is not eligible for account upgrade");
        }
    
        // Create a new Contributor using data from Visitor
        Contributor contributor = new Contributor(
            visitor.getProfilePicturePath(),
            visitor.getDisplayName(),
            visitor.getUsername(),
            visitor.getEmail(),
            visitor.getBio(),
            visitor.getLocation(),
            visitor.getWebsite(),
            visitor.getFollowing()
        );
        
        // Initialize Contributor-specific fields with defaults
        contributor.setTotalPosts(0);
        contributor.setTotalViews(0);
        contributor.setTotalLikes(0);
        contributor.setFollowers(0);
    
        // Delete the old Visitor record
        visitorRepository.delete(visitor);

        // Save the new Contributor first
         Contributor savedContributor = contributorRepository.save(contributor);
        
      

        return savedContributor;
    }
    

    // Optional: Additional methods for finding visitors by specific criteria
    public Optional<Visitor> getVisitorByUsername(String username) {
        return visitorRepository.findByUsername(username);
    }

    public Optional<Visitor> getVisitorByEmail(String email) {
        return visitorRepository.findByEmail(email);
    }
} 