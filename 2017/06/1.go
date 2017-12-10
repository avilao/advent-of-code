package main

import "fmt"
import "os"
import "bufio"
import "strings"
import "strconv"

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	var a []int
	for scanner.Scan() {
		s := scanner.Text()

		for _, n := range strings.Fields(s) {
			x, _ := strconv.Atoi(n)
			a = append(a, x)
		}

	}

	mapSequence := make(map[string]int)
	steps := 0

	for {
		steps++
		currentIndex := maxIndex(a)

		stepsToDist := a[currentIndex]
		a[currentIndex] = 0
		for i := (currentIndex + 1) % len(a); stepsToDist > 0; i = (i + 1) % len(a) {
			a[i]++
			stepsToDist--
		}

		key := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(a)), " "), "[]")

		mapSequence[key]++

		if mapSequence[key] > 1 {
			break
		}

		fmt.Println(maxIndex(a))

		fmt.Println(a)
	}
	fmt.Println(steps)
}

func maxIndex(array []int) int {
	maxIndex := 0
	max := 0
	for i := 0; i < len(array); i++ {
		if array[i] > max {
			maxIndex = i
			max = array[i]
		}
	}

	return maxIndex
}
