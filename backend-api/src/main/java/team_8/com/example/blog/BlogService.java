package team_8.com.example.blog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {
    
    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    public List<Blog> getBlogsByContributor(Long contributorId) {
        return blogRepository.findByContributorId(contributorId);
    }

    public List<Blog> getBlogsByStatus(BlogStatus status) {
        return blogRepository.findByStatus(status);
    }

    public List<Blog> searchBlogsByTitle(String title) {
        return blogRepository.findByTitleContainingIgnoreCase(title);
    }

    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    public Blog updateBlog(Long id, Blog blogDetails) {
        Optional<Blog> blog = blogRepository.findById(id);
        if (blog.isPresent()) {
            Blog existingBlog = blog.get();
            existingBlog.setTitle(blogDetails.getTitle());
            existingBlog.setContent(blogDetails.getContent());
            existingBlog.setStatus(blogDetails.getStatus());
            return blogRepository.save(existingBlog);
        }
        return null;
    }

    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
} 