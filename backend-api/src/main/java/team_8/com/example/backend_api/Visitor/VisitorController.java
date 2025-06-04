package team_8.com.example.backend_api.Visitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import team_8.com.example.backend_api.Contributor.Contributor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
public class VisitorController {

    private final VisitorService visitorService;

    @Autowired
    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    @GetMapping("/api/visitors")
    public List<Visitor> getAllVisitors() {
        return visitorService.getAllVisitors();
    }

    @GetMapping("/api/visitors/{id}")
    public Visitor getVisitorById(@PathVariable Long id) {
        return visitorService.getVisitorById(id);
    }

    @PostMapping("/api/visitors")
    public Visitor createVisitor(@RequestBody Visitor visitor) {
        return visitorService.createVisitor(visitor);
    }

    @PutMapping("/api/visitors/{id}")
    public Visitor updateVisitor(@PathVariable Long id, @RequestBody Visitor visitor) {
        return visitorService.updateVisitor(id, visitor);
    }

    @DeleteMapping("/api/visitors/{id}")
    public void deleteVisitor(@PathVariable Long id) {
        visitorService.deleteVisitor(id);
    }

    @PostMapping("/api/visitors/{id}/apply-for-contributor")
    public Visitor applyForContributor(@PathVariable Long id) {
        return visitorService.applyForContributor(id);
    }

    @GetMapping("/api/visitors/{id}/upgrade-account")
    public void upgradeAccount(@PathVariable Long id) {
      //serve upgrade account page
    }

    @PostMapping("/api/visitors/{id}/upgrade-account")
    public Contributor upgradeAccountPost(@PathVariable Long id) {
        return visitorService.upgradeAccount(id);
    }
}
