import $ from './jquery-3.1.1.min';

$(document).ready(() => {
    
    console.log('I am ready to animate!');
    
    animateAll();
});

$(document).bind('mousewheel',() => {
    
    console.log('Yah');
});

export const setupMainBg = img => {
    
    return {
        height: window.innerHeight,
        backgroundImage: "url(" + img + ")"
   }
}


function animateAll() {
    Anima().animateText(".greetings", { delay : '1s', 
                                       visibility: "visible", 
                                       color: 'white', 
                                       swipePath: window.innerHeight/2.5 + 'px'
                                      });
    
    Anima().animateText(".customer-text", { delay : '2s', 
                                           visibility: "visible", 
                                           color: 'white', 
                                           swipePath: window.innerHeight/2.5 + 'px'
                                        });
    
    Anima().animateText(".swipe-text", { delay : '2s', 
                                           visibility: "visible",
                                           color: '#ffb6c9',
                                           swipePath: '1px',
                                            shadowOpacity: '1'
                                        });
}

export const Anima = _ => ({
    
    animateText: (targetClass, options) => {
        
        $(targetClass).css({
            "transition": "all " + (options.delay || '5s') + " ease"
        });

        $(targetClass).css({
            "text-shadow": "0 0 10px rgba(0, 0, 0, " + (options.shadowOpacity || '0.3') + ")"
        });

        $(targetClass).css({
            "visibility": options.visibility || 'hidden'
        });

        $(targetClass).css({
            "color": options.color || 'black'
        });

        $(targetClass).css({
            "margin-top": options.swipePath || '100px'
        });
        
    }
})