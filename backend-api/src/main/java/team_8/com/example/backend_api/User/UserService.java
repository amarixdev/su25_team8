package team_8.com.example.backend_api.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team_8.com.example.backend_api.Contributor.Contributor;
import team_8.com.example.backend_api.Contributor.ContributorRepository;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ContributorRepository contributorRepository;

    @Autowired
    public UserService(UserRepository userRepository, ContributorRepository contributorRepository) {
        this.userRepository = userRepository;
        this.contributorRepository = contributorRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    public User createUser(User user) {
        // Add any validation or business logic before saving
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Update fields
        user.setDisplayName(userDetails.getDisplayName());
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setBio(userDetails.getBio());
        user.setLocation(userDetails.getLocation());
        user.setWebsite(userDetails.getWebsite());
        user.setProfilePicturePath(userDetails.getProfilePicturePath());

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    // Optional: Add methods to find users by other criteria if needed, e.g.,
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Follow functionality
    public void followContributor(Long userId, Long contributorId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        Contributor contributor = contributorRepository.findById(contributorId)
                .orElseThrow(() -> new RuntimeException("Contributor not found with id: " + contributorId));

        if (user.isFollowing(contributor)) {
            throw new RuntimeException("User is already following this contributor");
        }

        user.followContributor(contributor);
        contributor.addFollower(user);

        userRepository.save(user);
        contributorRepository.save(contributor);
    }

    public void unfollowContributor(Long userId, Long contributorId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        Contributor contributor = contributorRepository.findById(contributorId)
                .orElseThrow(() -> new RuntimeException("Contributor not found with id: " + contributorId));

        if (!user.isFollowing(contributor)) {
            throw new RuntimeException("User is not following this contributor");
        }

        user.unfollowContributor(contributor);
        contributor.removeFollower(user);

        userRepository.save(user);
        contributorRepository.save(contributor);
    }

    public List<Contributor> getFollowing(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return new ArrayList<>(user.getFollowing());
    }

    public boolean isFollowing(Long userId, Long contributorId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        Contributor contributor = contributorRepository.findById(contributorId)
                .orElseThrow(() -> new RuntimeException("Contributor not found with id: " + contributorId));
        return user.isFollowing(contributor);
    }
}
