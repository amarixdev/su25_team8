package team_8.com.example.blog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/contributor/{contributorId}")
    public List<Blog> getBlogsByContributor(@PathVariable Long contributorId) {
        return blogService.getBlogsByContributor(contributorId);
    }

    @GetMapping("/status/{status}")
    public List<Blog> getBlogsByStatus(@PathVariable BlogStatus status) {
        return blogService.getBlogsByStatus(status);
    }

    @GetMapping("/search")
    public List<Blog> searchBlogsByTitle(@RequestParam String title) {
        return blogService.searchBlogsByTitle(title);
    }

    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogService.createBlog(blog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody Blog blogDetails) {
        Blog updatedBlog = blogService.updateBlog(id, blogDetails);
        return updatedBlog != null ? ResponseEntity.ok(updatedBlog) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok().build();
    }
} 