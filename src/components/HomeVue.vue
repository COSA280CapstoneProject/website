<template>
  <PostingPopup @close="showPopup = false" v-if="showPopup" />
  <AdminView/>
  
  <div class="home">
    <section class="banner">
    </section>

    <!-- Introduction Section -->
    <section class="introduction trapezoid">
      <div class="content">
        <div class="logo">
          <img src="@/assets/Saskatchewan_Polytechnic_logo.png" alt="Introduction Image" style="width: 65%;" />
        </div>
        <div class="text">
          <p>
            ICT Regina is a dynamic and innovative platform dedicated to connecting companies with top-tier resources across diverse industries.
            The revamped homepage showcases a visually striking design with three distinct trapezoidal sections, each contributing to an engaging and seamless user experience.
          </p>
          <p> The introduction section, styled as a trapeze, features an image on the left and a comprehensive text on the right, providing users with an overview of ICT's mission and history.
            The submit a post section, designed as an inclined trapeze, presents a sleek button inviting users to create postings, redirecting them to the relevant form page.
          </p>
        </div>
      </div>
    </section>

    <!-- Line Between Introduction and Submit a Post Section -->
    <div class="line line-1"></div>

    <!-- Submit a Post Section -->
    <section class="submit-post trapezoid">
      <div class="content">
        <div class="inner-content">
        <h2>Submit a Post</h2>
        <button @click="showPopup = true">Create Posting</button>
        
        <p>If you are an employer seeking top-tier talent to fill key positions within your company, requesting a resource through ICT is your gateway to a pool of skilled professionals.
          By clicking the "Create Posting" button, you unlock the opportunity to access a diverse range of qualified candidates tailored to your specific industry needs.
        </p>
        <p> ICT simplifies and streamlines the hiring process, providing a platform where employers can connect with the right talent efficiently and effectively.
          Elevate your recruitment strategy with ICT and discover the ideal candidates to drive success for your business.
        </p>
      </div>
        </div>
    </section>

    <!-- Line Between Submit a Post and Testimonials/Video Section -->
    <div class="line line-2"></div>

    <!-- Testimonials and Video Section -->
    <section class="testimonials-video trapezoid">
      <div class="content testimonials-container">
        <!-- Written Testimonials -->
        <div class="testimonials">

          <div class="employerReview">
            <h4>Audrey K:</h4>
            <h5 class="subtitle">CST Student</h5>
          </div>

          <p>
            "Working with ICT has been a transformative experience for our HR team.
            The platform's extensive network of professionals, coupled with its advanced matching algorithms, ensures that we consistently discover qualified candidates who align with our company's culture and values.
            The streamlined process and valuable insights provided by ICT have significantly enhanced our recruitment outcomes."</p>

          <div class="employerReview">
            <h4>Spencer Nikkel:</h4>
            <h5 class="subtitle">Client</h5>
          </div>
          <p>
            "Choosing ICT for our hiring needs was a strategic move that paid off immensely.
            The platform's innovative approach to recruitment empowers employers to make data-driven decisions and connect with candidates who not only possess the right skills but also align with our organizational goals.
            ICT has become an indispensable ally in our quest for building a high-performing team."</p>
          <!-- Add more testimonials as needed -->
        </div>

        <!-- Video Advertisement -->
        <div class="video-ad">
          <h2>What Employers Have To Say About ICT</h2>
          <video controls>
            <source src="path-to-your-video.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer>
      <div class="footer-content">
        <div class="footer-logo">
          <img src="@/assets/footer-logo.png" alt="Footer Logo" style="width: 200%;" />
        </div>
        <div class="footer-info">
          <p>&copy; 2024 ICT Regina. All rights reserved.</p>
          <p>123 Main Street, Regina, SK S4P 3Y2</p>
          <p>Email: info@ictregina.com | Phone: (123) 456-7890</p>
        </div>
        <div class="footer-social">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/logo.png" alt="Facebook Icon" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/logo.png" alt="Twitter Icon" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/logo.png" alt="LinkedIn Icon" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import PostingPopup from '@/components/PostingPopup.vue'
import AdminView from '@/components/AdminView.vue'

export default {
  name: 'HomeVue',
  components: {
    PostingPopup, AdminView
  },
  data() {
    return {
      showText: true,
      showPopup: false
    };
  },
  methods: {
    
  },
  mounted() {
  },
};
</script>

<style scoped>
.home {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
.logo {
  padding-bottom: 50px;
}
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes at least the height of the viewport */
  margin-top: 50px;
}

/* Banner styles */
.banner {
  position: relative;
  text-align: center;
}

.banner img {
  width: 100%; /* Adjust as needed */
  max-height: 200px
}

.banner h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem; /* Adjust as needed */
}


/* Common styles for trapezoidal sections */
.trapezoid {
  position: relative;
  overflow: hidden;
  margin: 2rem 0;
}

.trapezoid:before {
  content: '';
  position: absolute;
  top: -40px; /* adjust as needed */
  left: 20%;
  width: 60%; /* adjust as needed */
  height: 0;
  border-bottom: 40px solid transparent; /* Transparent border */
  border-left: 10px solid transparent;
  border-right: 20px solid transparent;
  z-index: 1;
}

.trapezoid:after {
  content: '';
  position: absolute;
  bottom: -40px; /* adjust as needed */
  left: 10%;
  width: 70%; /* adjust as needed */
  height: 0;
  border-top: 40px solid transparent; /* Transparent border */
  border-left: 20px solid transparent;
  border-right: 10px solid transparent;
  z-index: 1;
}

/* Lines between sections */
.line {
  position: relative;
  margin: 0;
  height: 4px;
  width: 100%;
  background-color: black; /* Line color */
}

.line-1 {
  transform: rotate(-3deg); /* Angle of 20 degrees clockwise */
  z-index: 0;
}

.line-2 {
  transform: rotate(-3deg); /* Angle of 10 degrees counter-clockwise */
  z-index: 0;
}

.introduction {
  transform: skewY(-3deg); /* Skew the background */
  background-color: green;
  margin: 0;
  padding-top: 125px;
  padding-bottom: 10px;
  margin-top: -100px;
  z-index: 0;
}

/* Specific styles for each section */
.introduction .content {
  display: flex;
  align-items: center;
  transform: skewY(3deg); /* Counter-skew the content */
}

.submit-post {
  background-color: #CBC3E3;
  margin: 0;
  padding: 23px 0px;
  z-index: 0;
  transform: skewY(-3deg); /* Skew the background */
}

.submit-post .content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit-post .inner-content {
  transform: skewY(3deg); /* Counter-skew the content */
}


.introduction img {
  max-width: 100%;
  height: auto;
  margin-right: 1rem;
}

.submit-post button {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.employerReview {
  text-align: left;
}

.employerReview p {
  margin: 0;
}

.subtitle {
  font-style: italic;
  margin: 0;
}

.testimonials-video .content {
  display: flex;
}

.testimonials {
  max-width: 50%;
}

.testimonials p {
  margin-bottom: 1rem;
}

.video-ad {
  margin-left: 2rem; /* Adjust as needed for spacing */
}

.video-ad h2 {
  margin-top: 0; /* Remove top margin */
}


/* Footer styles */
footer {
  background-color: #732181;
  color: #fff;
  padding: 1rem 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-logo img {
  max-width: 100px;
}

.footer-info {
  max-width: 300px;
}

.footer-social img {
  width: 30px;
  margin-right: 10px;
}
</style>
