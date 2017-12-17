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
	//f := make(map[int][]int)
	max := 0

	for scanner.Scan() {
		s := scanner.Text()

		str := strings.Split(strings.Replace(s, ":", "", -1), " ")

		n, _ := strconv.Atoi(str[0])
		d, _ := strconv.Atoi(str[1])

		h[n] = d

		/*for i := 0; i < d; i++ {
			f[n] = append(f[n], i)
		}*/

		max = n

	}
	max++

	//fmt.Println(len(f), max)

	sum := 0
	for i := 0; i < max; i++ {
		if h[i] > 0 {
			pos := i % (2*h[i] - 2)

			fmt.Println(i, pos)

			if pos == 0 {
				sum += i * h[i]
			}
		}
	}

	fmt.Println(sum)
}
