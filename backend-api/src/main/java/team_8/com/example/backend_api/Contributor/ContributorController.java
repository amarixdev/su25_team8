package team_8.com.example.backend_api.Contributor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for handling Contributor operations.
 */
@RestController
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

    @GetMapping("/api/contributors/{id}")
    public ResponseEntity<Contributor> getContributorById(@PathVariable Long id) {
        return contributorService.getContributorById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    ///ANALYTICS ENDPOINTS
    @GetMapping("/api/contributors/top/posts")
    public ResponseEntity<List<Contributor>> getTopContributorsByPosts(@RequestParam Integer minPosts) {
        return ResponseEntity.ok(contributorService.getTopContributorsByPosts(minPosts));
    }

    @GetMapping("/api/contributors/top/views")
    public ResponseEntity<List<Contributor>> getTopContributorsByViews(@RequestParam Integer minViews) {
        return ResponseEntity.ok(contributorService.getTopContributorsByViews(minViews));
    }

    @GetMapping("/api/contributors/top/likes")
    public ResponseEntity<List<Contributor>> getTopContributorsByLikes(@RequestParam Integer minLikes) {
        return ResponseEntity.ok(contributorService.getTopContributorsByLikes(minLikes));
    }


    @PostMapping("/api/contributors")
    public ResponseEntity<Contributor> createContributor(@RequestBody Contributor contributor) {
        return ResponseEntity.ok(contributorService.createContributor(contributor));
    }

    @PutMapping("/api/contributors/{id}")
    public ResponseEntity<Contributor> updateContributor(
            @PathVariable Long id,
            @RequestBody Contributor updatedContributor) {
        return ResponseEntity.ok(contributorService.updateContributor(id, updatedContributor));
    }

    @DeleteMapping("/api/contributors/{id}")
    public ResponseEntity<Void> deleteContributor(@PathVariable Long id) {
        contributorService.deleteContributor(id);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/api/contributors/{id}/views")
    public ResponseEntity<Contributor> incrementViews(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementViews(id));
    }

    @PostMapping("/api/contributors/{id}/likes")
    public ResponseEntity<Contributor> incrementLikes(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementLikes(id));
    }

    @PostMapping("/api/contributors/{id}/followers")
    public ResponseEntity<Contributor> incrementFollowers(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementFollowers(id));
    }

    @DeleteMapping("/api/contributors/{id}/followers")
    public ResponseEntity<Contributor> decrementFollowers(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.decrementFollowers(id));
    }

} 