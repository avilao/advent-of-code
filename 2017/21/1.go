package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

type Rule struct {
	in  map[int]map[int]string
	out map[int]map[int]string
}

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)
	rules := []Rule{}

	// build rules
	for scanner.Scan() {
		line := scanner.Text()

		ruleRaw := strings.Split(line, " => ")
		ruleRawIn := strings.Split(ruleRaw[0], "/")
		ruleRawOut := strings.Split(ruleRaw[1], "/")

		var rule Rule
		rule.in = make(map[int]map[int]string)
		rule.out = make(map[int]map[int]string)

		for i := 0; i < len(ruleRawIn); i++ {
			rule.in[i] = make(map[int]string)
		}

		for y, v := range ruleRawIn {
			for x, v := range strings.Split(v, "") {
				rule.in[x][y] = v
			}
		}

		for i := 0; i < len(ruleRawOut); i++ {
			rule.out[i] = make(map[int]string)
		}

		for y, v := range ruleRawOut {
			for x, v := range strings.Split(v, "") {
				rule.out[x][y] = v
			}
		}

		rules = append(rules, rule)
	}

	// build original art
	art := make(map[int]map[int]string)

	art[0] = make(map[int]string)
	art[1] = make(map[int]string)
	art[2] = make(map[int]string)

	art[0][0] = "."
	art[0][1] = "."
	art[0][2] = "#"
	art[1][0] = "#"
	art[1][1] = "."
	art[1][2] = "#"
	art[2][0] = "."
	art[2][1] = "#"
	art[2][2] = "#"

	// augment
	for i := 0; i < 5; i++ {
		// check new pixel size
		blockSize := 3
		if len(art[0])%2 == 0 {
			blockSize = 2
		}

		blockLength := len(art[0]) / blockSize

		newArt := createPixel(blockLength * (blockSize + 1))

		for y := 0; y < len(art[0]); y += blockSize {
			for x := 0; x < len(art[0]); x += blockSize {
				// get block to augment
				p := getSection(art, x, y, blockSize)

				// match rule
				p = findRule(p, rules)

				// fill new art
				newX := (x / blockSize) * (blockSize + 1)
				newY := (y / blockSize) * (blockSize + 1)
				for j := 0; j < len(p); j++ {
					for i := 0; i < len(p); i++ {
						newArt[i+newX][j+newY] = p[i][j]
					}
				}
			}
		}

		art = newArt
		printPixel(art)
	}

	sum := 0
	for _, p := range art {
		for _, c := range p {
			if c == "#" {
				sum++
			}
		}
	}

	fmt.Println(sum)
}

func getSection(m map[int]map[int]string, x int, y int, size int) map[int]map[int]string {
	p := createPixel(size)

	for j := 0; j < size; j++ {
		for i := 0; i < size; i++ {
			p[i][j] = m[i+x][j+y]
		}

	}
	return p
}

func createPixel(size int) map[int]map[int]string {
	b := make(map[int]map[int]string)

	for i := 0; i < size; i++ {
		b[i] = make(map[int]string)

		for j := 0; j < size; j++ {
			b[i][j] = ""
		}
	}

	return b
}

func copyPixel(m map[int]map[int]string) map[int]map[int]string {
	n := make(map[int]map[int]string)

	for i := 0; i < len(m); i++ {
		n[i] = make(map[int]string)
		for j := 0; j < len(m); j++ {
			n[i][j] = m[i][j]
		}
	}
	return n
}

func findRule(p map[int]map[int]string, rules []Rule) map[int]map[int]string {
	// TODO: only rotate when needed
	p1 := copyPixel(p)
	p2 := rotatePixel(p1)
	p3 := rotatePixel(p2)
	p4 := rotatePixel(p3)
	p5 := flipPixel(p, 0)
	p6 := rotatePixel(p5)
	p7 := rotatePixel(p6)
	p8 := rotatePixel(p7)

	for _, r := range rules {
		if len(r.in[0]) != len(p[0]) {
			continue
		}
		if equalPixels(r.in, p1) || equalPixels(r.in, p2) || equalPixels(r.in, p3) || equalPixels(r.in, p4) || equalPixels(r.in, p5) || equalPixels(r.in, p6) || equalPixels(r.in, p7) || equalPixels(r.in, p8) {
			return r.out
		}
	}

	return p
}

func printPixel(m map[int]map[int]string) {
	for y := 0; y < len(m); y++ {
		for x := 0; x < len(m); x++ {
			fmt.Print(m[x][y])
		}
		fmt.Print("\n")
	}
	fmt.Println("")
}

func rotatePixel(m map[int]map[int]string) map[int]map[int]string {
	n := copyPixel(m)

	for y := 0; y < len(m); y++ {
		for x := 0; x < len(m); x++ {
			n[x][y] = m[y][len(m)-x-1]
		}
	}
	return n
}

func flipPixel(m map[int]map[int]string, direction int) map[int]map[int]string {
	n := copyPixel(m)

	for i := 0; i < len(m); i++ {
		for j := 0; j < len(m); j++ {
			if direction == 0 {
				n[j][i] = m[len(m)-j-1][i]
			} else {
				n[j][i] = m[j][len(m)-i-1]
			}
		}
	}
	return n
}

func equalPixels(a map[int]map[int]string, b map[int]map[int]string) bool {
	for y := 0; y < len(a); y++ {
		for x := 0; x < len(a[y]); x++ {
			if a[x][y] != b[x][y] {
				return false
			}
		}
	}
	return true
}
