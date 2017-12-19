package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {

	buffer := []int{0}
	current := 0

	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')

	spin, _ := strconv.Atoi(input)
	for i := 1; i < 2018; i++ {
		current = (current + spin) % len(buffer)
		buffer = append(buffer[:(current+1)], append([]int{i}, buffer[(current+1):]...)...)
		current++
	}
	fmt.Println(buffer[current+1])
}

/*
func spin(a []int, offset int) []int {
	var r []int

	for i := 0; i < len(a); i++ {
		r = append(r, a[(len(a)+i-offset)%len(a)])
	}

	return r
}*/
