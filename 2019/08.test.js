import { readFile } from '../utils/filesystem';
import { getLayerWithFewerDigits, getMessage } from './08';

const input = readFile('08.input', import.meta.url);

describe('2019 08', () => {
  it('Part One', () => {
    expect(getLayerWithFewerDigits(input)).toBe(1596);
  });

  it('Part Two', () => {
    expect(getMessage(input)).toBe(`
#    ###  ###   ##  #### 
#    #  # #  # #  # #    
#    ###  #  # #    ###  
#    #  # ###  #    #    
#    #  # # #  #  # #    
#### ###  #  #  ##  #### 
`);
  });
});
