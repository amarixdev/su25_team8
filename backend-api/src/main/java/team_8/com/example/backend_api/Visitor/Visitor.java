package team_8.com.example.backend_api.Visitor;

import jakarta.persistence.*;
import team_8.com.example.backend_api.User.*;

@Entity
@DiscriminatorValue("VISITOR")
public class Visitor extends User {
    //Upgrade criteria
    private int accountAge;
    private int postsReads;
    private boolean canUpgradeAccount;

    // Constructors
    public Visitor(){}


    // Constructor with all User fields and Visitor specific fields
    public Visitor(String profilePicturePath, String displayName, String username, String email, 
                   String bio, String location, String website,
                   int accountAge, int postsReads, boolean canUpgradeAccount) {
        super(profilePicturePath, displayName, username, email, bio, location, website);
        this.accountAge = accountAge;
        this.postsReads = postsReads;
        this.canUpgradeAccount = canUpgradeAccount;
    }

    // Getters and setters
    public int getAccountAge() {
        return accountAge;
    }

    public void setAccountAge(int accountAge) {
        this.accountAge = accountAge;
    }

    public int getPostsReads() {
        return postsReads;
    }

    public void setPostsReads(int postsReads) {
        this.postsReads = postsReads;
    }

    public boolean canUpgradeAccount() {
        return canUpgradeAccount;
    }

    public void setCanUpgradeAccount(boolean canUpgradeAccount) {
        this.canUpgradeAccount = true;
    }
}
