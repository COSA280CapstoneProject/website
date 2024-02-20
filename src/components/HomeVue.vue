<template>
  <PostingPopup v-if="showPopup" @close="showPopup = false" />
  
  
  <div class="home">
    <section class="banner">
    </section>

    <!-- Introduction Section -->
    <section class="introduction trapezoid">
      <div class="content">
        <div class="logo">
        <a href="https://saskpolytech.ca/" target="_blank">
          <img src="@/assets/Saskatchewan_Polytechnic_logo.png" alt="Introduction Image" style="width: 65%;" />
        </a>
        </div>
        <div class="text">
          <h1>Introduction</h1>
          <h2>
            ICT Regina is a dynamic and innovative platform dedicated to connecting companies with top-tier resources across diverse industries.
            The revamped homepage showcases a visually striking design with three distinct trapezoidal sections, each contributing to an engaging and seamless user experience.
          </h2>
          <h2> The introduction section, styled as a trapeze, features an image on the left and a comprehensive text on the right, providing users with an overview of ICT's mission and history.
            The submit a post section, designed as an inclined trapeze, presents a sleek button inviting users to create postings, redirecting them to the relevant form page.
          </h2>
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
        <p><em>We will be evaluating your posting</em></p>
      </div>
    </div>
    </section>

    <!-- Line Between Submit a Post and Testimonials Section -->
    <div class="line line-2"></div>

    <!-- Testimonials Section -->
    <section class="testimonials-section trapezoid">
      <div class="testimonials-header-text">
        <h2>What people are saying</h2>
      </div>
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
            The streamlined process and valuable insights provided by ICT have significantly enhanced our recruitment outcomes."
          </p>

          <div class="employerReview">
            <h4>Spencer Nikkel:</h4>
            <h5 class="subtitle">Client</h5>
          </div>
          <p>
            "Choosing ICT for our hiring needs was a strategic move that paid off immensely.
            The platform's innovative approach to recruitment empowers employers to make data-driven decisions and connect with candidates who not only possess the right skills but also align with our organizational goals.
            ICT has become an indispensable ally in our quest for building a high-performing team."
          </p>
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
          <p><a href="https://maps.app.goo.gl/kQPc3ypHg8xk8xdW7" target="_blank" rel="noopener noreferrer">4500 Wascana Pkwy, Regina, SK S4S 5X1</a></p>
          <p>Email: <a href="mailto:info@ictregina.com">info@ictregina.com</a> | Phone: <a href="tel:1234567890">(123) 456-7890</a></p>
        </div>
        <div class="footer-social">
        <a href="https://www.facebook.com/saskpolytech/" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/facebook.png" alt="Facebook Icon" />
        </a>
        <a href="https://x.com/SaskPolytech" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/x.png" alt="Twitter (X) Icon" />
        </a>
        <a href="https://www.linkedin.com/school/saskpolytech" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/linkedin.png" alt="LinkedIn Icon" />
        </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import PostingPopup from '@/components/PostingPopup.vue'


export default {
  name: 'HomeVue',
  components: {
    PostingPopup
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
  width: 100%;
  max-height: 200px
}

.banner h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
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
  top: -40px;
  left: 20%;
  width: 60%;
  height: 0;
  border-bottom: 40px solid transparent; /* Transparent border */
  border-left: 10px solid transparent;
  border-right: 20px solid transparent;
  z-index: 1;
}

.trapezoid:after {
  content: '';
  position: absolute;
  bottom: -40px;
  left: 10%;
  width: 70%;
  height: 0;
  border-top: 40px solid transparent; /* Transparent border */
  border-left: 20px solid transparent;
  border-right: 10px solid transparent;
  z-index: 1;
}



.introduction {
  transform: skewY(3deg); /* Skew the background */
  background-color: lightgray;
  margin: 0;
  padding-top: 125px;
  padding-bottom: 10px;
  margin-top: -100px;
  z-index: 1;
}

/* Specific styles for each section */
.introduction .content {
  display: flex;
  align-items: center;
  transform: skewY(-3deg); /* Counter-skew the content */
}

.submit-post {
  background-color: #8D68AB;
  margin: -100px;
  margin-top: -125px;
  padding: 23px 0px;
  padding-top: 150px;
  padding-left: 400px;
  padding-right: 400px;
  padding-bottom: 150px;
  z-index: 0;
}

.submit-post .content {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  text-align: center;
}

.employerReview p {
  margin: 0;
}

.subtitle {
  font-style: italic;
  margin: 0;
}

.testimonials-section {
  background-color: lightgray;
  padding-top: 50px;
  padding-bottom: 50px;
  z-index: 2;
  transform: skewY(-3deg); /* Skew the background */
  margin-bottom: -50px;
}

.testimonials-section .content {
  display: flex;
  justify-content: center;
  background-color: lightgray;
  padding-top: 5px;
  padding-left: 50px;
  padding-bottom: 50px;
  transform: skewY(3deg); /* Counter-skew the content */
  z-index: 2;
}

.testimonials-header-text {
  display: flex;
  justify-content: center;
  padding-left: 50px;
  transform: skewY(3deg); /* Counter-skew the content */
  z-index: 2;
}

.testimonials {
  max-width: 50%;
}

.testimonials p {
  margin-bottom: 1rem;
}

.video-ad {
  margin-left: 2rem;
}

.video-ad h2 {
  margin-top: 0; /* Remove top margin */
}


/* Footer styles */
footer {
  background-color: #753C97;
  color: #fff;
  padding: 1rem 0;
  z-index: 3;
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
  width: 80%;
}

.footer-social img {
  width: 30px;
  margin-right: 10px;
}
</style>
