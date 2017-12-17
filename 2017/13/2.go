package main

import "fmt"
import "os"
import "bufio"
import "strings"
import "strconv"

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	h := make(map[int]int)
	max := 0

	for scanner.Scan() {
		s := scanner.Text()
		str := strings.Split(strings.Replace(s, ":", "", -1), " ")

		n, _ := strconv.Atoi(str[0])
		d, _ := strconv.Atoi(str[1])

		h[n] = d
		max = n
	}

	max++
	j := 0

	for {
		caught := false
		for i := 0; i < max; i++ {
			if h[i] > 0 {
				pos := (i + j) % (2*h[i] - 2)

				if pos == 0 {
					caught = true
					break
				}
			}
		}

		if !caught {
			break
		}

		j++
	}

	fmt.Println(j)
}
