<template>
  <PostingPopup v-if="showPopup" @close="showPopup = false" />
  
  <navbar />

   <!-- Main banner -->
   <div class="main-banner" style="z-index: 5; padding-bottom: 20px;">
      <div class="image-carousel">
        <!-- Implement your image carousel here -->
        <img v-for="(image, index) in images" :key="index" :src="image.src" :alt="'Image ' + (index + 1)" :class="{ 'active': index === currentIndex }" />
      </div>
    </div>
    

    <hr class="separator-line">
      

  <div class="home">
    <section class="banner">
    </section>

    <!-- Introduction Section -->
    <section class="introduction trapezoid introduction-bg">
      <div class="content">
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
import navbar from '@/components/AdminView.vue'

export default {
  name: 'HomeVue',
  components: {
    PostingPopup,
    navbar,
  },
  data() {
    return {
      showText: true,
      showPopup: false,
      images: [
        { src: require('@/assets/banner1.png') },
        { src: require('@/assets/banner2.png') },
        { src: require('@/assets/banner3.png') }
      ],
      currentIndex: 0
    };
  },
  methods: {
   

 startSlideshow() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 3000); // Change image every 3 seconds
    }
  },
  mounted() {
    this.startSlideshow();
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
.introduction h1 {
  font-size: 1.2rem; /* Adjusted font size for the heading */
}

.introduction h2 {
  font-size: 0.8rem; /* Adjusted font size for the paragraph */
}

.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes at least the height of the viewport */
  margin-top: 50px;
}

/* Styles for Main Banner Section */
/* Thin line to separate navbar from main banner */
.separator-line {
  border: none;
  border-top: 1px solid #ccc;
  margin: 0;
}

/* Main banner styles */
.main-banner {
  /* Style as a rectangle */
  height: 200px; /* Adjust height as needed */
  background-color: #f0f0f0; /* Background color */
  padding-top: 20px; /* Reduce padding top */
}

.image-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.image-carousel img.active {
  opacity: 1;
}

/* Slideshow styles */
.slideshow {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slideshow img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slideshow img.active {
  opacity: 1;
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
  background-color: white;
  position: relative;
  overflow: hidden;
  margin: 0 0 2rem; /* Adjusted margin to remove gap between sections */
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
  background-color: white;
  padding: 0; /* Adjusted padding to remove the gap */
  margin: 0; /* Remove margin */
  z-index: 1;
}

.introduction-bg { /* Background image for the introduction section */
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* Specific styles for each section */
.introduction .content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
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

.text {
  color: #000;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}

.testimonials-section {
  background-color: white;
  padding-top: 50px;
  padding-bottom: 50px;
  z-index: 2;
  transform: skewY(-3deg); /* Skew the background */
  margin-bottom: -50px;
}

.testimonials-section .content {
  display: flex;
  justify-content: center;
  background-color: white;
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
