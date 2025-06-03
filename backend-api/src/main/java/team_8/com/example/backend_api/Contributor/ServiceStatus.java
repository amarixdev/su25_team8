package team_8.com.example.backend_api.Contributor;

/**
 * Enum representing the possible statuses of an EducationalService.
 * DRAFT: Service is being created/edited and is not yet published
 * PUBLISHED: Service is live and available to subscribers
 * ARCHIVED: Service is no longer available but kept for reference
 */
public enum ServiceStatus {
    DRAFT,
    PUBLISHED,
    ARCHIVED
} 