package team_8.com.example.backend_api.Contributor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for handling Contributor operations.
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
} 