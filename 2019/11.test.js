import { readFile } from '../utils/filesystem';
import { solve, solve2 } from './11';

const input = readFile('11.input', import.meta.url);

describe('2019 11', () => {
  it('A', () => {
    expect(solve(input)).toBe(2252);
  });

  it('B', () => {
    expect(solve2(input)).toBe(`
 ##   ##   ##  #    ###   ##    ## ####  
#  # #  # #  # #    #  # #  #    # #     
#  # #    #  # #    #  # #       # ###   
#### # ## #### #    ###  # ##    # #     
#  # #  # #  # #    # #  #  # #  # #     
#  #  ### #  # #### #  #  ###  ##  ####  
`);
  });
});
