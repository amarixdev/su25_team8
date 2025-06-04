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

    ///ANALYTICS ENDPOINTS
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


    @PostMapping("/{id}/views")
    public ResponseEntity<Contributor> incrementViews(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementViews(id));
    }

    @PostMapping("/{id}/likes")
    public ResponseEntity<Contributor> incrementLikes(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementLikes(id));
    }

    @PostMapping("/{id}/followers")
    public ResponseEntity<Contributor> incrementFollowers(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.incrementFollowers(id));
    }

    @DeleteMapping("/{id}/followers")
    public ResponseEntity<Contributor> decrementFollowers(@PathVariable Long id) {
        return ResponseEntity.ok(contributorService.decrementFollowers(id));
    }

} 