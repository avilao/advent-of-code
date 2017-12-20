package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

var directions = [][]int{
	[]int{0, 1},
	[]int{1, 0},
	[]int{0, -1},
	[]int{-1, 0}}

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	m := make(map[int][]string)
	i := 0
	for scanner.Scan() {
		line := scanner.Text()
		m[i] = strings.Split(line, "")
		i++
	}

	var result []string

	p := []int{0, 0}
	dir := 0

	// get starting point
	for k, v := range m[0] {
		if v == "|" {
			p[0] = k
		}
	}

	for {
		p[0] += directions[dir][0]
		p[1] += directions[dir][1]

		if p[0] < 0 || p[1] < 0 || p[0] >= len(m[0]) || p[1] >= len(m) {
			break
		}

		c := m[p[1]][p[0]]

		if c == " " {
			break
		}

		// add if letter
		if c != "|" && c != "-" && c != "+" && c != " " {
			result = append(result, c)
		}

		// calc new direction
		if c == "+" {
			end := true
			//fmt.Print(p[0], p[1])
			for d := 1; d < 4; d += 2 {
				x := p[0] + directions[(dir+d)%4][0]
				y := p[1] + directions[(dir+d)%4][1]

				if x < 0 || y < 0 || x >= len(m[0]) || y >= len(m) {
					continue
				}
				if m[y][x] != " " {
					dir = (dir + d) % 4
					end = false
				}
			}

			if end {
				break
			}
		}
	}

	for _, v := range result {
		fmt.Print(v)
	}
}
