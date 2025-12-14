function goToBooking() {
    window.location.href = 'booking.html';
}

function goToServices() {
    window.location.href = '\services.html';
}

let questionForm = document.getElementById('questionForm');
if (questionForm) {
    questionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let name = this.querySelector('input[type="text"]').value;
        let email = this.querySelector('input[type="email"]').value;
        let message = this.querySelector('textarea').value;

        if (name == '' || email == '' || message == '') {
            alert('Пожалуйста, заполните все поля!');
            return;
        }
  
        alert('Спасибо, ' + name + '! Ваше сообщение отправлено. Мы свяжемся с вами по адресу: ' + email);

        this.reset();
    });
}

let bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let name = document.getElementById('name').value;
        let phone = document.getElementById('phone').value;
        let problem = document.getElementById('problem').value;
        let date = document.getElementById('date').value;
        let description = document.getElementById('description').value;

        if (name == '') {
            alert('Введите ваше имя!');
            return;
        }
        
        if (phone == '') {
            alert('Введите номер телефона!');
            return;
        }
        
        if (problem == '') {
            alert('Выберите тип поломки!');
            return;
        }
        
        if (date == '') {
            alert('Выберите дату!');
            return;
        }

        alert('Спасибо за запись, ' + name + '!\n\nВаша заявка принята:\n- Телефон: ' + phone + '\n- Дата: ' + date + '\n\nМы свяжемся с вами для подтверждения.');

        this.reset();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    let links = document.querySelectorAll('a[href^="#"]');
    
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            let href = this.getAttribute('href');
            
            if (href == '#') {
                return;
            }
            
            e.preventDefault();
            
            let target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

window.addEventListener('scroll', function() {
    let cards = document.querySelectorAll('.card, .service-card');
    
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let cardTop = card.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let cards = document.querySelectorAll('.card, .service-card');
    
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.opacity = '0';
        cards[i].style.transform = 'translateY(50px)';
        cards[i].style.transition = 'all 0.6s ease';
    }

    window.dispatchEvent(new Event('scroll'));
});

let phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        let value = this.value;
        let cleaned = '';
        
        for (let i = 0; i < value.length; i++) {
            let char = value[i];
            if (char >= '0' && char <= '9' || char == '+' || char == '(' || char == ')' || char == '-' || char == ' ') {
                cleaned += char;
            }
        }
        
        this.value = cleaned;
    });
}

let dateInput = document.getElementById('date');
if (dateInput) {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    
    let minDate = year + '-' + month + '-' + day;
    dateInput.setAttribute('min', minDate);
}

let socialIcons = document.querySelectorAll('.social-icon');
for (let i = 0; i < socialIcons.length; i++) {
    socialIcons[i].addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.2)';
    });
    
    socialIcons[i].addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1)';
    });
}

 
class HeroSlider {
  constructor() {
    this.slider = document.querySelector('.hero-slider');
    if (!this.slider) return;
    
    this.slides = this.slider.querySelectorAll('.slide');
    this.indicators = this.slider.querySelectorAll('.indicator');
    this.prevBtn = this.slider.querySelector('.prev-btn');
    this.nextBtn = this.slider.querySelector('.next-btn');
    this.currentSlide = 0;
    this.slideInterval = null;
    this.autoSlideDelay = 5000;  
    
    this.init();
  }
  
  init() {
     
    this.showSlide(this.currentSlide);
    
     
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
     
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
     
    this.startAutoSlide();
    
     
    this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
    this.slider.addEventListener('mouseleave', () => this.startAutoSlide());
    
     
    this.slider.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('focus', () => this.stopAutoSlide());
      btn.addEventListener('blur', () => this.startAutoSlide());
    });
  }
  
  showSlide(index) {
     
    this.slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.display = 'none';
    });
    
     
    this.indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    
     
    this.slides[index].style.display = 'block';
    setTimeout(() => {
      this.slides[index].classList.add('active');
    }, 10);
    
     
    if (this.indicators[index]) {
      this.indicators[index].classList.add('active');
    }
    
    this.currentSlide = index;
  }
  
  nextSlide() {
    let nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(nextIndex);
    this.restartAutoSlide();
  }
  
  prevSlide() {
    let prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
    this.restartAutoSlide();
  }
  
  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.showSlide(index);
      this.restartAutoSlide();
    }
  }
  
  startAutoSlide() {
    if (this.slideInterval) return;
    
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }
  
  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }
  
  restartAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}

 
document.addEventListener('DOMContentLoaded', function() {
  new HeroSlider();
  
   
  document.addEventListener('keydown', function(e) {
    const slider = document.querySelector('.hero-slider');
    if (!slider || !document.querySelector('.hero-slider .slide.active')) return;
    
     
    const sliderRect = slider.getBoundingClientRect();
    if (sliderRect.top < window.innerHeight && sliderRect.bottom > 0) {
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          document.querySelector('.hero-slider .prev-btn')?.click();
          break;
        case 'ArrowRight':
          e.preventDefault();
          document.querySelector('.hero-slider .next-btn')?.click();
          break;
        case 'Home':
          e.preventDefault();
          document.querySelector('.hero-slider .indicator[data-slide="0"]')?.click();
          break;
        case 'End':
          e.preventDefault();
          const lastIndex = document.querySelectorAll('.hero-slider .slide').length - 1;
          document.querySelector(`.hero-slider .indicator[data-slide="${lastIndex}"]`)?.click();
          break;
      }
    }
  });
});