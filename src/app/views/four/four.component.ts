import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-four',
  templateUrl: './four.component.html',
  styleUrls: ['./four.component.scss']
})
export class FourComponent {

  rows = 8
  cols = 7

  numColors = 4
  numPatterns = 14
  squares = new Array(this.numColors * this.numPatterns)
  quilt = new Array(this.numColors * this.numPatterns)
  nq = 0

  colors = [
    "#f88",
    "#8f8",
    "#88f",
    "#f8f"
  ]

  constructor() {

    for (let index = 0, color = 0; color < this.numColors; color++)
      for (let pattern = 0; pattern < this.numPatterns; pattern++)
        this.squares[index++] = { color: this.colors[color], pattern }

    console.log("squares", this.squares)
  }

  randcol = () => "#" + Math.floor(Math.random() * 16777215).toString(16)

  range = (size, startAt = 0) => [...Array(size).keys()].map(i => i + startAt)

  solve() {
    while (this.squares.length > 0) {
      const len = this.squares.length
      for (let i = 0; i < len; i++) {
        if (this.match(i)) {
          this.quilt[this.nq++] = this.squares.splice(i, 1)
          break
        }
      }
      if (len == this.squares.length) {
        alert("DIDN'T WORK")
        // didn't work
        break
      }
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
  }

  match(i) {
    let fit = true
    if (this.nq > this.cols)
      fit &&=
        (this.quilt[this.nq - this.cols].color != this.squares[i].color) &&
        (this.quilt[this.nq - this.cols].pattern != this.squares[i].pattern)
    if (fit && (this.nq % this.cols))
      fit &&=
        (this.quilt[this.nq - 1].color != this.squares[i].color) &&
        (this.quilt[this.nq - 1].pattern != this.squares[i].pattern)
    return fit
  }
}
