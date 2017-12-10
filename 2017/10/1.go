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
	var v []int

	for scanner.Scan() {
		s := scanner.Text()
		offset := 0
		current := 0

		str := strings.Split(s, ",")

		// build input
		for i := range str {
			n, _ := strconv.Atoi(str[i])
			a = append(a, n)
		}

		// build mem array
		for i := 0; i < 256; i++ {
			v = append(v, i)
		}

		for j := 0; j < len(a); j++ {
			start := current % len(v)
			end := a[j] + current - 1

			for i := 0; i < a[j]/2; i++ {
				s := (start + i) % len(v)
				e := (end - i) % len(v)

				tmp := v[s]
				v[s] = v[e]
				v[e] = tmp
			}

			current = (current + a[j] + offset) % len(v)
			offset++
		}

		fmt.Print(v[0] * v[1])
	}
}
