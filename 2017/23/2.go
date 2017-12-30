package main

import "fmt"

func main() {
	h := 0
	b := 79
	b = b*100 + 100000
	c := b
	b += 17000
	for ; c <= b; c += 17 {
		for j := 2; j < c; j++ {
			if c%j == 0 {
				h++
				break
			}
		}
	}
	fmt.Println(h)
}
