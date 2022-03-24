import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[backgroundWeather]'
})
export class BackgroundWeather implements OnChanges {
    @Input() iconName: string;
    @Input() onHoverEffect: boolean;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('mouseenter') onEnter( e: MouseEvent ) {
        if (this.onHoverEffect) {
            this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(1.03)`);
            this.el.nativeElement.style.cursor = 'pointer';
            this.renderer.setStyle(this.el.nativeElement, 'border', '0.3rem solid #ff8900');
        }
    }

    @HostListener('mouseleave') onExit( e: MouseEvent ) {
        if (this.onHoverEffect) {
            this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(1)`);
            this.renderer.setStyle(this.el.nativeElement, 'border', 'none');
        }
    }
    
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['iconName'] && changes['iconName'].currentValue) {
            this.iconName = changes['iconName'].currentValue;
            this.setBackground();
        }
    }

    setBackground() {
        if (this.iconName.endsWith('n'))
            this.el.nativeElement.style.backgroundColor = '#000040';
        else
            this.el.nativeElement.style.backgroundColor = '#00ceff';
    }
}