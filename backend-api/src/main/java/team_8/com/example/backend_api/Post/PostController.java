package team_8.com.example.backend_api.Post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/contributor/{contributorId}")
    public List<Post> getPostsByContributor(@PathVariable Long contributorId) {
        return postService.getPostsByContributor(contributorId);
    }

    @GetMapping("/status/{status}")
    public List<Post> getPostsByStatus(@PathVariable PostStatus status) {
        return postService.getPostsByStatus(status);
    }

    @GetMapping("/search")
    public List<Post> searchPostsByTitle(@RequestParam String title) {
        return postService.searchPostsByTitle(title);
    }

    @PostMapping("/contributor/{contributorId}")
    public Post createPost(@RequestBody Post post, @PathVariable Long contributorId) {
        return postService.createPost(post, contributorId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        Post updatedPost = postService.updatePost(id, postDetails);
        return updatedPost != null ? ResponseEntity.ok(updatedPost) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Post> likePost(@PathVariable Long id) {
        try {
            Post likedPost = postService.incrementLikes(id);
            return ResponseEntity.ok(likedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{postId}/toggle-like/{userId}")
    public ResponseEntity<Post> toggleLike(@PathVariable Long postId, @PathVariable Long userId) {
        try {
            Post post = postService.toggleLike(postId, userId);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{postId}/liked-by/{userId}")
    public ResponseEntity<Boolean> isPostLikedByUser(@PathVariable Long postId, @PathVariable Long userId) {
        try {
            boolean isLiked = postService.isPostLikedByUser(postId, userId);
            return ResponseEntity.ok(isLiked);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/views")
    public ResponseEntity<Post> incrementViews(@PathVariable Long id) {
        try {
            Post post = postService.incrementViews(id);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 