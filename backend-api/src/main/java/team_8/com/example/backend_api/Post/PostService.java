package team_8.com.example.backend_api.Post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team_8.com.example.backend_api.Contributor.Contributor;
import team_8.com.example.backend_api.Contributor.ContributorRepository;

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

    public Post createPost(Post post, Long contributorId) {
        Contributor contributor = contributorRepository.findById(contributorId)
            .orElseThrow(() -> new RuntimeException("Contributor not found with id: " + contributorId));
        contributor.addPost(post);
        return postRepository.save(post);
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

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
} 