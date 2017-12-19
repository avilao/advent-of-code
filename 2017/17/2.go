package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {

	//buffer := []int{0}
	current := 0

	prize := 0

	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')

	spin, _ := strconv.Atoi(input)
	for i := 1; i < 50000000; i++ {
		current = (current + spin) % i

		if current == 0 {
			prize = i
		}
		current++
	}
	fmt.Println(prize)
}
