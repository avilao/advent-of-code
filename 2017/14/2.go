package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var m [128][128]int

var regions int

func main() {
	// your code goes here
	reader := bufio.NewReader(os.Stdin)
	var input []int

	m = [128][128]int{}

	for {
		s, err := reader.ReadByte()

		if err != nil {
			break
		}
		input = append(input, int(s))
	}

	// build matrix
	for i := 0; i < 128; i++ {
		kh := getKnotHash(input, i)

		bs := hexToBin(kh)

		for j, c := range bs {
			v := 0
			if c == '1' {
				v = 1
			}

			m[i][j] = v
		}
	}

	regions := 0
	for i := 0; i < 128; i++ {
		for j := 0; j < 128; j++ {
			if m[i][j] == 1 {
				navMatrix(i, j)
				regions++
			}
		}
	}

	fmt.Println(regions)
}

func navMatrix(x int, y int) {

	m[x][y] = 0

	if x-1 >= 0 && m[x-1][y] == 1 {
		navMatrix(x-1, y)
	}

	if x+1 < 128 && m[x+1][y] == 1 {
		navMatrix(x+1, y)
	}

	if y-1 >= 0 && m[x][y-1] == 1 {
		navMatrix(x, y-1)
	}

	if y+1 < 128 && m[x][y+1] == 1 {
		navMatrix(x, y+1)
	}
}

func getKnotHash(input []int, round int) string {
	var a []int
	var v []int

	a = input
	a = append(a, int('-'))

	for _, char := range strconv.Itoa(round) {
		a = append(a, int(char))
	}

	a = append(a, 17)
	a = append(a, 31)
	a = append(a, 73)
	a = append(a, 47)
	a = append(a, 23)

	// build mem array
	for i := 0; i < 256; i++ {
		v = append(v, i)
	}

	offset := 0
	current := 0

	for r := 0; r < 64; r++ {
		for j := 0; j < len(a); j++ {
			l := a[j]
			start := current
			end := current + l - 1

			for i := 0; i < l/2; i++ {
				s := (start + i) % len(v)
				e := (end - i) % len(v)

				tmp := v[s]
				v[s] = v[e]
				v[e] = tmp
			}
			current = (current + l + offset) % len(v)
			offset++
		}
	}

	knotHash := ""
	for val, i := 0, 0; i < 256; i += 16 {
		val = 0
		for j := i; j < i+16; j++ {
			val = val ^ v[j]
		}
		knotHash += fmt.Sprintf("%02x", val)
	}

	return knotHash
}

func hexToBin(h string) string {
	var m = [16]string{
		"0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111",
		"1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111"}
	var b string
	for i := 0; i < len(h); i++ {
		tmp := h[i]

		if tmp > 57 {
			tmp -= 87
		} else {
			tmp -= 48
		}

		b += m[tmp]
	}
	return b
}
