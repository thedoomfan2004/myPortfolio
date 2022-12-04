gsap.registerPlugin(ScrollTrigger);


  document.onmousemove = (event) => {
    const {
      clientX,
      clientY
    } = event
    console.log(clientX, clientY)
    setTimeout( function(){
    document.getElementById('cursor').style.top = `${clientY - 15}px`
    document.getElementById('cursor').style.left = `${clientX - 15}px`
    }, 70) 
  }

gsap.to('*', {
  ease: 'linear'
})

gsap.to('.pin-seq', {
  scrollTrigger: {
    pin: true,
    trigger: '.pin-seq',
    start: 'top 30%',
    end: '4500px center'
  }
})

gsap.from('.pin-block2', {
  x: 2000,
  scrollTrigger: {
    scrub: true,
    trigger: '.pin-block2',
    start: '800px 10%',
    end: '1400px top'
  }
})

gsap.from('.pin-block3', {
  x: -2000,
  scrollTrigger: {
    scrub: true,
    trigger: '.pin-block3',
    start: '1900px 10%',
    end: '2500px top'
  }
})

gsap.from('.pin-block4', {
  x: 4000,
  scrollTrigger: {
    scrub: true,
    trigger: '.pin-block4',   
    start: '3000px 10%',
    end: '3600px top'
  }
})



gsap.to('.parallax2', {
  bottom: '-1300px',
  scrollTrigger: {
    scrub: true,
    trigger: '.parallax1',    
    start: 'top top',
    end: '2100px top'
  }
})

gsap.to('.parallax3', {
  bottom: '-400px',
  scrollTrigger: {
    scrub: true,
    trigger: '.parallax1',    
    start: 'top top',
    end: '1300px top',
    
  }
})

gsap.to('.parallax4', {
  bottom: '-900px',
  scrollTrigger: {
    scrub: true,
    trigger: '.parallax1',   
    start: 'top top',
    
    end: '1300px top'
  }
})



gsap.to('.nav .nav-li a', {
  color: 'white',
  scrollTrigger: {
    trigger: '.nav',
    scrub: true,
    start: '700px 20px',
    end: '1000px top'
  }
})

gsap.to('.horizontal-seq', {
  x: '-300vw',
  ease: 'linear',
  scrollTrigger: {
    trigger: '.horizontal-seq',
    scrub: true,
    pin: true,
    start: 'top top',
    end: '4500px top',
  }
})

gsap.to('.progressBar', {
  width: '100vw',
  scrollTrigger: {
    trigger: '.progressbar',
    start: 'top top',
    end: `bottom ${height}`,
    scrub: true,
  }
})


var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );







  class ArrowPointer {
   constructor() {
     this.root = document.body
     this.cursor = document.querySelector(".curzr")
 
     this.position = {
       distanceX: 0, 
       distanceY: 0,
       distance: 0,
       pointerX: 0,
       pointerY: 0,
     },
     this.previousPointerX = 0
     this.previousPointerY = 0
     this.angle = 0
     this.previousAngle = 0
     this.angleDisplace = 0
     this.degrees = 57.296
     this.cursorSize = 22.2
 
     this.cursorStyle = {
       boxSizing: 'border-box',
       position: 'fixed',
       top: '0px',
       left: `${ -this.cursorSize / 2 }px`,
       zIndex: '2147483647',
       width: `${ this.cursorSize }px`,
       height: `${ this.cursorSize }px`,
       transition: '250ms, transform 128ms',
       userSelect: 'none',
       pointerEvents: 'none'
     }
 
     this.init(this.cursor, this.cursorStyle)
   }
 
   init(el, style) {
     Object.assign(el.style, style)
     this.cursor.removeAttribute("hidden")
     
     document.body.style.cursor = 'none'
     document.body.querySelectorAll("button, label, input, textarea, select, a").forEach((el) => {
       el.style.cursor = 'inherit'
     })
   }
 
   move(event) {
     this.previousPointerX = this.position.pointerX
     this.previousPointerY = this.position.pointerY
     this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x
     this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y
     this.position.distanceX = this.previousPointerX - this.position.pointerX
     this.position.distanceY = this.previousPointerY - this.position.pointerY
     this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)
   
     this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`
 
     if (this.distance > 1) {
       this.rotate(this.position)
     } else {
       this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`
     }
   }
 
   rotate(position) {
     let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
     let modAngle
     const style = this.cursor.style
     this.previousAngle = this.angle
 
     if (position.distanceX <= 0 && position.distanceY >= 0) {
       this.angle = 90 - unsortedAngle + 0
     } else if (position.distanceX < 0 && position.distanceY < 0) {
       this.angle = unsortedAngle + 90
     } else if (position.distanceX >= 0 && position.distanceY <= 0) {
       this.angle = 90 - unsortedAngle + 180
     } else if (position.distanceX > 0 && position.distanceY > 0) {
       this.angle = unsortedAngle + 270
     }
 
     if (isNaN(this.angle)) {
       this.angle = this.previousAngle
     } else {
       if (this.angle - this.previousAngle <= -270) {
         this.angleDisplace += 360 + this.angle - this.previousAngle
       } else if (this.angle - this.previousAngle >= 270) {
         this.angleDisplace += this.angle - this.previousAngle - 360
       } else {
         this.angleDisplace += this.angle - this.previousAngle
       }
     }
     style.transform += ` rotate(${this.angleDisplace}deg)`
 
     setTimeout(() => {
       modAngle = this.angleDisplace >= 0 ? this.angleDisplace % 360 : 360 + this.angleDisplace % 360
       if (modAngle >= 45 && modAngle < 135) {
         style.left = `${ -this.cursorSize }px`
         style.top = `${ -this.cursorSize / 2 }px`
       } else if (modAngle >= 135 && modAngle < 225) {
         style.left = `${ -this.cursorSize / 2 }px`
         style.top = `${ -this.cursorSize }px`
       } else if (modAngle >= 225 && modAngle < 315) {
         style.left = '0px'
         style.top = `${ -this.cursorSize / 2 }px`
       } else {
         style.left = `${ -this.cursorSize / 2 }px`
         style.top = '0px'
       }
     }, 0)
   }
 
   remove() {
     this.cursor.remove()
   }
 }
 
 (() => {
   const cursor = new ArrowPointer()
   if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {    
     document.onmousemove = function (event) {
       cursor.move(event)
     }
   } else {
     cursor.remove()
   }
 })()


gsap.to('.rotate', {
  rotation: '+=360',
  repeat: -1,
  ease: 'none',
  duration: 10
})

gsap.to('.to-top', {
  zIndex: 999,
  scrollTrigger: {
    pin: true,
    trigger: '.to-top',
    start: 'top 80%',
    end: `${height}px top`
  }
})

gsap.to('.zoom-seq', {
  scrollTrigger: {
    pin: true,
    scrub: true,
    trigger: '.zoom-seq',
    end: '3000px top'
  }
})

gsap.to('.zoom1', {
  width: '60%',
  height: '20%',
  opacity: '1',
  borderLeft: '20vw solid rgb(255, 115, 0)',
  borderRight: '20vw solid blue',
  top: 0,
  scrollTrigger: {
    trigger: '.zoom1',
    scrub: true
  }
})

gsap.to('.zoom2', {
  width: '60%',
  height: '20%',
  borderLeft: '20vw solid white',
  borderRight: '20vw solid rgb(83, 250, 32)',
  opacity: '1',
  top: '20%',
  scrollTrigger: {
    // markers: true,
    start: '600px bottom',
    end: '600px top',
    trigger: '.zoom2',
    scrub: true
  }
})


gsap.to('.zoom3', {
  width: '60%',
  height: '20%',
  opacity: '1',
  borderLeft: '20vw solid yellow',
  borderRight: '20vw solid rgb(58, 58, 58)',
  top: '40%',
  scrollTrigger: {
    // markers: true,
    start: '1200px bottom',
    end: '1200px top',
    trigger: '.zoom3',
    scrub: true
  }
})


gsap.to('.zoom4', {
  width: '60%',
  height: '20%',
  opacity: '1',
  top: '60%',
  borderLeft: '20vw solid green',
  borderRight: '20vw solid green',
  scrollTrigger: {
    // markers: true,
    start: '1800px bottom',
    end: '1800px top',
    trigger: '.zoom3',
    scrub: true
  }
})


gsap.to('.zoom5', {
  width: '60%',
  opacity: '1',
  height: '20%',
  top: '80%',
  borderLeft: '20vw solid rgb(0, 53, 151)',
  borderRight: '20vw solid yellow',
  scrollTrigger: {
    // markers: true,
    start: '2400px bottom',
    end: '2400px top',
    trigger: '.zoom3',
    scrub: true
  }
})