package team_8.com.example.backend_api.Visitor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {

    Optional<Visitor> findByUsername(String username);

    Optional<Visitor> findByEmail(String email);

    Optional<Visitor> findByDisplayName(String displayName);
} 