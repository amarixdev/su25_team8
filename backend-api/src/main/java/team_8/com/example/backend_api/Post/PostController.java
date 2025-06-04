package team_8.com.example.backend_api.Post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
// @RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/api/posts")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/api/posts/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/api/blogs/contributor/{contributorId}")
    public List<Post> getPostsByContributor(@PathVariable Long contributorId) {
        return postService.getPostsByContributor(contributorId);
    }

    @GetMapping("/api/blogs/status/{status}")
    public List<Post> getBlogsByStatus(@PathVariable PostStatus status) {
        return postService.getPostsByStatus(status);
    }

    @GetMapping("/api/blogs/search")
    public List<Post> searchBlogsByTitle(@RequestParam String title) {
        return postService.searchPostsByTitle(title);
    }

    @PostMapping("/api/posts")
    public Post createPost(@RequestBody Post post, @RequestParam Long contributorId) {
        return postService.createPost(post, contributorId);
    }

    @PutMapping("/api/posts/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        Post updatedPost = postService.updatePost(id, postDetails);
        return updatedPost != null ? ResponseEntity.ok(updatedPost) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/api/posts/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok().build();
    }
} 