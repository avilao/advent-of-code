package main

import (
	"fmt"
)

func main() {
	// your code goes here
	vA := 699
	vB := 124

	factorA := 16807
	factorB := 48271

	mod := 2147483647
	sum := 0
	for r := 0; r < 5000000; r++ {
		vA = genValue(vA, factorA, mod, 4)
		vB = genValue(vB, factorB, mod, 8)

		tmpA := vA
		tmpB := vB
		eq := true
		for i := 0; i < 16; i++ {

			if tmpA%2 != tmpB%2 {
				eq = false
				break
			}
			tmpA /= 2
			tmpB /= 2
		}

		if eq {
			sum++
		}
	}

	fmt.Println(sum)
}

func genValue(current int, factor int, mod int, criteria int) int {

	for {
		current = (current * factor % mod)

		if current%criteria == 0 {
			return current
		}
	}
}
