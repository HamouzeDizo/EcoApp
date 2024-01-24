// star-rating.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="star-rating">
      <span *ngFor="let _ of stars" class="star" [class.full]="stars.indexOf(_) < rating">&#9733;</span>
      <span class="rating-value">{{ rating }}</span>
    </div>
  `,
  styles: [
    `
      .star-rating {
        display: flex;
        align-items: center;
      }

      .star {
        font-size: 1.5rem;
        color: gold;
        cursor: pointer;
      }

      .full {
        color: gold;
      }

      .rating-value {
        margin-left: 0.5rem;
      }
    `,
  ],
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  stars: number[] = Array(5).fill(0);
}
