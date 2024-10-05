window.onload = function() {
  if (!window.location.hash || window.location.hash !== "#home") {
    window.location.hash = "#home";
  }
};

document.addEventListener("DOMContentLoaded", function(){
  window.scrollTo(0, 0);
  const navbar = document.querySelector("nav");
  // Select all elements with the class "feature"
  const featureElements = document.querySelectorAll(".feature");

  // Loop through each feature element
  featureElements.forEach((feature) => {
    // Set initial opacity to 0
    gsap.set(feature, { opacity: 0 });

    // Create a GSAP timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: feature,
        start: "top 80%", // Start animation when the top of the element is 80% from the top of the viewport
        end: "bottom 20%", // End animation when the bottom of the element is 20% from the top of the viewport
        toggleActions: "play none none reverse",
      },
    });

    // Add animation to the timeline
    tl.to(feature, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  });
  const feature_text = document.querySelector(".features .container h1");
  gsap.set(feature_text, { opacity: 0 });
  gsap.to(feature_text, {
    opacity: 1,
    scrollTrigger: {
      trigger: feature_text,
      start: "top 80%", // Start animation when the top of the element is 80% from the top of the viewport
      end: "bottom 20%", // End animation when the bottom of the element is 20% from the top of the viewport
      toggleActions: "play none none reverse",
    },
  });
  const about = document.querySelector(".about .container");
  gsap.set(about, { scale: 0 });
  gsap.to(about, {
    scale: 1,
    scrollTrigger: {
      trigger: about,
      start: "top 80%", // Start animation when the top of the element is 80% from the top of the viewport
      end: "bottom 20%", // End animation when the bottom of the element is 20% from the top of the viewport
      toggleActions: "play none none reverse",
    },
  });
  const booking_card = document.querySelector(".booking .op");
  gsap.set(booking_card, { transform: "translateX(-70vw)" });
  gsap.to(booking_card, {
    transform: "translateX(0)",
    scrollTrigger: {
      trigger: booking_card,
      start: "top 80%", // Start animation when the top of the element is 80% from the top of the viewport
      end: "bottom 20%", // End animation when the bottom of the element is 20% from the top of the viewport
      toggleActions: "play none none reverse",
    },
  })
  const goal = document.querySelector(".goal-content");
  gsap.set(goal, { transform: "translateX(70vw)" });
  gsap.to(goal, {
    transform: "translateX(0)",
    scrollTrigger: {
      trigger: goal,
      start: "top 80%", // Start animation when the top of the element is 80% from the top of the viewport
      end: "bottom 20%", // End animation when the bottom of the element is 20% from the top of the viewport
      toggleActions: "play none none reverse",
    },
  })
  document.addEventListener("scroll", function(){
    navbar.classList.toggle("skibidi", window.scrollY < 30);
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  })
  
  const canvas = document.querySelector("#bg");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const context = canvas.getContext("2d");
  const frameCount = 581;
  
  const currentFrame = (index) => `/bg/${(index + 1).toString()}.webp`;
  
  const images = [];
  let anim = { frame: 0 };
  
  // Preload images
  const preloadImages = async () => {
    const imagePromises = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const promise = new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; // Handle error, but continue loading
      });
      img.src = currentFrame(i);
      images.push(img);
      imagePromises.push(promise);
    }
    await Promise.all(imagePromises);
    document.body.classList.remove("hidden");
    initAnimation();
  };

  const initAnimation = () => {
    gsap.to(anim, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 0.2,
        pin: "canvas",
        end: "2000%",
      },
      onUpdate: render,
    });

    render(); // Initial render
  };

  function render() {
    if (images[anim.frame] && images[anim.frame].complete) {
      context.canvas.width = images[anim.frame].width;
      context.canvas.height = images[anim.frame].height;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[anim.frame], 0, 0);
    }
  }

  // Start preloading images
  preloadImages();
  document.getElementById("year").innerHTML = new Date().getFullYear();
});
function reload_page() {
  location.reload();
}
window.onresize = reload_page;