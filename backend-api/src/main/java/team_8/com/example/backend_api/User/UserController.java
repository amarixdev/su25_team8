package team_8.com.example.backend_api.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/api/users")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/api/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/api/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // Login endpoint - check if username exists
    @PostMapping("/api/users/login")
    public ResponseEntity<User> loginUser(@RequestParam String username) {
        Optional<User> user = userService.getUserByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Follow a contributor
    @PostMapping("/api/users/{userId}/follow/{contributorId}")
    public ResponseEntity<String> followContributor(@PathVariable Long userId, @PathVariable Long contributorId) {
        try {
            userService.followContributor(userId, contributorId);
            return ResponseEntity.ok("Successfully followed contributor");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Unfollow a contributor
    @DeleteMapping("/api/users/{userId}/follow/{contributorId}")
    public ResponseEntity<String> unfollowContributor(@PathVariable Long userId, @PathVariable Long contributorId) {
        try {
            userService.unfollowContributor(userId, contributorId);
            return ResponseEntity.ok("Successfully unfollowed contributor");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get list of contributors a user is following
    @GetMapping("/api/users/{userId}/following")
    public ResponseEntity<List<team_8.com.example.backend_api.Contributor.Contributor>> getFollowing(@PathVariable Long userId) {
        try {
            List<team_8.com.example.backend_api.Contributor.Contributor> following = userService.getFollowing(userId);
            return ResponseEntity.ok(following);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Check if user is following a contributor
    @GetMapping("/api/users/{userId}/following/{contributorId}")
    public ResponseEntity<Boolean> isFollowing(@PathVariable Long userId, @PathVariable Long contributorId) {
        try {
            boolean isFollowing = userService.isFollowing(userId, contributorId);
            return ResponseEntity.ok(isFollowing);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}


