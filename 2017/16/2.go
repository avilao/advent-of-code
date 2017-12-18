package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// your code goes here

	alphabet := []string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"}

	check := make(map[string]int)

	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')
	steps := strings.Split(input, ",")

	stop := 1000000000
	for i := 0; i < stop; i++ {
		for _, s := range steps {

			action := string(s[0])
			operands := strings.TrimPrefix(s, action)

			if action == "s" {
				offset, _ := strconv.Atoi(operands)
				alphabet = spin(alphabet, offset)
			} else {
				ops := strings.Split(operands, "/")

				if action == "x" {
					o1, _ := strconv.Atoi(ops[0])
					o2, _ := strconv.Atoi(ops[1])

					alphabet = exchange(alphabet, o1, o2)
				}

				if action == "p" {
					alphabet = partner(alphabet, ops[0], ops[1])
				}
			}
		}

		hash := strings.Join(alphabet, "")
		if check[hash] > 1 {
			stop = i + (stop % i)

		}

		check[hash]++
	}

	for _, c := range alphabet {
		fmt.Print(c)
	}
}

func spin(s []string, offset int) []string {
	var r []string

	for i := 0; i < len(s); i++ {
		r = append(r, s[(len(s)+i-offset)%len(s)])
	}

	return r
}

func exchange(s []string, a int, b int) []string {
	tmp := s[a]
	s[a] = s[b]
	s[b] = tmp

	return s
}

func partner(s []string, a string, b string) []string {
	indexA := -1
	indexB := -1

	for i := 0; i < len(s); i++ {
		if s[i] == a {
			indexA = i
		}

		if s[i] == b {
			indexB = i
		}
	}

	return exchange(s, indexA, indexB)
}
