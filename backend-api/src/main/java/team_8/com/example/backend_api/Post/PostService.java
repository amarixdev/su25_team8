package team_8.com.example.backend_api.Post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team_8.com.example.backend_api.Contributor.Contributor;
import team_8.com.example.backend_api.Contributor.ContributorRepository;
import team_8.com.example.backend_api.User.User;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ContributorRepository contributorRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public List<Post> getPostsByContributor(Long contributorId) {
        return postRepository.findByContributorId(contributorId);
    }

    public List<Post> getPostsByStatus(PostStatus status) {
        return postRepository.findByStatus(status);
    }

    public List<Post> searchPostsByTitle(String title) {
        return postRepository.findByTitleContainingIgnoreCase(title);
    }

    @Transactional //  if either operation fails, the other is rolled back
    public Post createPost(Post post, Long contributorId) {
        Contributor contributor = contributorRepository.findById(contributorId)
            .orElseThrow(() -> new RuntimeException("Contributor not found with id: " + contributorId));

        contributor.addPost(post); 
        Post savedPost = postRepository.save(post);
        contributor.incrementPosts();
        contributorRepository.save(contributor);
        return savedPost;
    }

    public Post updatePost(Long id, Post postDetails) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            Post existingPost = post.get();
            existingPost.setTitle(postDetails.getTitle());
            existingPost.setContent(postDetails.getContent());
            existingPost.setStatus(postDetails.getStatus());
            existingPost.setImagePath(postDetails.getImagePath());
            return postRepository.save(existingPost);
        }
        return null;
    }

    @Transactional 
    public void deletePost(Long id) {
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post postToDelete = postOptional.get();

            // Get the User who authored the post, and unproxy it to get the real object
            User author = postToDelete.getContributor();
            User realAuthor = Hibernate.unproxy(author, User.class);

            // Cast the real object to Contributor
            Contributor contributor = (Contributor) realAuthor;
            
            // Remove the post from the contributor's list
            if (contributor.getPosts() != null) {
                contributor.getPosts().remove(postToDelete);
            }
            // Decrement the posts count
            if (contributor != null && contributor.getTotalPosts() > 0) {
                contributor.decrementPosts();
                contributorRepository.save(contributor);
            }
              
            
            // Delete the post
            postRepository.delete(postToDelete);
        } else {
            throw new RuntimeException("Post not found with id: " + id);
        }
    }
} 