package team_8.com.example.backend_api.Contributor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for handling Contributor and their blog operations.
 */
@RestController
@RequestMapping("/api/contributors")
@CrossOrigin(origins = "http://localhost:3000")
public class ContributorController {

    private final ContributorService contributorService;

    @Autowired
    public ContributorController(ContributorService contributorService) {
        this.contributorService = contributorService;
    }

    // Contributor endpoints
    @GetMapping
    public ResponseEntity<List<Contributor>> getAllContributors() {
        return ResponseEntity.ok(contributorService.getAllContributors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contributor> getContributorById(@PathVariable Long id) {
        return contributorService.getContributorById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Contributor> getContributorByUsername(@PathVariable String username) {
        return contributorService.getContributorByUsername(username)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Contributor> getContributorByEmail(@PathVariable String email) {
        return contributorService.getContributorByEmail(email)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/background/{background}")
    public ResponseEntity<List<Contributor>> getContributorsByBackground(@PathVariable String background) {
        return ResponseEntity.ok(contributorService.getContributorsByAcademicBackground(background));
    }

    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<Contributor>> getContributorsBySubject(@PathVariable String subject) {
        return ResponseEntity.ok(contributorService.getContributorsBySubject(subject));
    }

    @GetMapping("/top/posts")
    public ResponseEntity<List<Contributor>> getTopContributorsByPosts(@RequestParam Integer minPosts) {
        return ResponseEntity.ok(contributorService.getTopContributorsByPosts(minPosts));
    }

    @GetMapping("/top/views")
    public ResponseEntity<List<Contributor>> getTopContributorsByViews(@RequestParam Integer minViews) {
        return ResponseEntity.ok(contributorService.getTopContributorsByViews(minViews));
    }

    @GetMapping("/top/likes")
    public ResponseEntity<List<Contributor>> getTopContributorsByLikes(@RequestParam Integer minLikes) {
        return ResponseEntity.ok(contributorService.getTopContributorsByLikes(minLikes));
    }

    @PostMapping
    public ResponseEntity<Contributor> createContributor(@RequestBody Contributor contributor) {
        return ResponseEntity.ok(contributorService.createContributor(contributor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contributor> updateContributor(
            @PathVariable Long id,
            @RequestBody Contributor updatedContributor) {
        return ResponseEntity.ok(contributorService.updateContributor(id, updatedContributor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContributor(@PathVariable Long id) {
        contributorService.deleteContributor(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/subjects")
    public ResponseEntity<Contributor> addSubject(
            @PathVariable Long id,
            @RequestParam String subject) {
        return ResponseEntity.ok(contributorService.addSubject(id, subject));
    }

    @DeleteMapping("/{id}/subjects")
    public ResponseEntity<Contributor> removeSubject(
            @PathVariable Long id,
            @RequestParam String subject) {
        return ResponseEntity.ok(contributorService.removeSubject(id, subject));
    }

    @PostMapping("/{id}/views")
    public ResponseEntity<Contributor> incrementViews(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementViews(id));
    }

    @PostMapping("/{id}/likes")
    public ResponseEntity<Contributor> incrementLikes(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementLikes(id));
    }

    @PostMapping("/{id}/bookmarks")
    public ResponseEntity<Contributor> incrementBookmarks(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementBookmarks(id));
    }

    @PostMapping("/{id}/posts")
    public ResponseEntity<Contributor> incrementPosts(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementPosts(id));
    }

    // Blog endpoints
    @GetMapping("/{contributorId}/blogs")
    public ResponseEntity<List<BlogService>> getContributorBlogs(@PathVariable Long contributorId) {
        return ResponseEntity.ok(contributorService.getServicesByContributor(contributorId));
    }

    @GetMapping("/blogs")
    public ResponseEntity<List<BlogService>> getAllBlogs() {
        return ResponseEntity.ok(contributorService.getAllServices());
    }

    @GetMapping("/blogs/{id}")
    public ResponseEntity<BlogService> getBlogById(@PathVariable Long id) {
        return contributorService.getServiceById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/blogs/status/{status}")
    public ResponseEntity<List<BlogService>> getBlogsByStatus(@PathVariable ServiceStatus status) {
        return ResponseEntity.ok(contributorService.getServicesByStatus(status));
    }

    @GetMapping("/blogs/category/{category}")
    public ResponseEntity<List<BlogService>> getBlogsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(contributorService.getServicesByCategory(category));
    }

    @GetMapping("/blogs/tag/{tag}")
    public ResponseEntity<List<BlogService>> getBlogsByTag(@PathVariable String tag) {
        return ResponseEntity.ok(contributorService.getServicesByTag(tag));
    }

    @GetMapping("/blogs/top/views")
    public ResponseEntity<List<BlogService>> getTopBlogsByViews() {
        return ResponseEntity.ok(contributorService.getTopServicesByViews());
    }

    @GetMapping("/blogs/top/likes")
    public ResponseEntity<List<BlogService>> getTopBlogsByLikes() {
        return ResponseEntity.ok(contributorService.getTopServicesByLikes());
    }

    @GetMapping("/blogs/top/subscribers")
    public ResponseEntity<List<BlogService>> getTopBlogsBySubscribers() {
        return ResponseEntity.ok(contributorService.getTopServicesBySubscribers());
    }

    @GetMapping("/blogs/search")
    public ResponseEntity<List<BlogService>> searchBlogs(@RequestParam String query) {
        return ResponseEntity.ok(contributorService.searchServices(query));
    }

    @PostMapping("/{contributorId}/blogs")
    public ResponseEntity<BlogService> createBlog(
            @PathVariable Long contributorId,
            @RequestBody BlogService blog) {
        return ResponseEntity.ok(contributorService.createService(blog, contributorId));
    }

    @PutMapping("/blogs/{id}")
    public ResponseEntity<BlogService> updateBlog(
            @PathVariable Long id,
            @RequestBody BlogService updatedBlog) {
        return ResponseEntity.ok(contributorService.updateService(id, updatedBlog));
    }

    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        contributorService.deleteService(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/blogs/{id}/categories")
    public ResponseEntity<BlogService> addCategory(
            @PathVariable Long id,
            @RequestParam String category) {
        return ResponseEntity.ok(contributorService.addCategory(id, category));
    }

    @DeleteMapping("/blogs/{id}/categories")
    public ResponseEntity<BlogService> removeCategory(
            @PathVariable Long id,
            @RequestParam String category) {
        return ResponseEntity.ok(contributorService.removeCategory(id, category));
    }

    @PostMapping("/blogs/{id}/tags")
    public ResponseEntity<BlogService> addTag(
            @PathVariable Long id,
            @RequestParam String tag) {
        return ResponseEntity.ok(contributorService.addTag(id, tag));
    }

    @DeleteMapping("/blogs/{id}/tags")
    public ResponseEntity<BlogService> removeTag(
            @PathVariable Long id,
            @RequestParam String tag) {
        return ResponseEntity.ok(contributorService.removeTag(id, tag));
    }

    @PutMapping("/blogs/{id}/status")
    public ResponseEntity<BlogService> updateBlogStatus(
            @PathVariable Long id,
            @RequestParam ServiceStatus status) {
        return ResponseEntity.ok(contributorService.updateStatus(id, status));
    }

    @PostMapping("/blogs/{id}/views")
    public ResponseEntity<BlogService> incrementBlogViews(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementServiceViews(id));
    }

    @PostMapping("/blogs/{id}/likes")
    public ResponseEntity<BlogService> incrementBlogLikes(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementServiceLikes(id));
    }

    @PostMapping("/blogs/{id}/subscribe")
    public ResponseEntity<BlogService> subscribeToBlog(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementServiceSubscribers(id));
    }

    @PostMapping("/blogs/{id}/unsubscribe")
    public ResponseEntity<BlogService> unsubscribeFromBlog(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.decrementServiceSubscribers(id));
    }
} 