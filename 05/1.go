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

	steps := 0
	for i := 0; i >= 0 && i < len(a); {

		steps++
		add := a[i]
		a[i]++

		i += add
	}

	fmt.Print(steps)

}
