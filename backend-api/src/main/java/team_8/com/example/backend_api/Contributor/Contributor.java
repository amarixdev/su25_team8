package team_8.com.example.backend_api.Contributor;

import jakarta.persistence.*;
import team_8.com.example.backend_api.User.*;

@Entity
@DiscriminatorValue("CONTRIBUTOR")
public class Contributor extends User {
    
    // Contributor-specific properties & methods
}
