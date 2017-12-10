package main

import "fmt"
import "os"
import "bufio"

func main() {
	// your code goes here
	reader := bufio.NewReader(os.Stdin)

	var a []int
	var v []int

	for {
		s, err := reader.ReadByte()

		if err != nil {
			break
		}
		a = append(a, int(s))
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
			start := current % len(v)
			end := l + current - 1

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

	for val, i := 0, 0; i < 256; i += 16 {
		val = 0
		for j := i; j < i+16; j++ {
			val = val ^ v[j]
		}
		fmt.Printf("%02x ", val)
	}

}
