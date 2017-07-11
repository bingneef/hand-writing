import sys
with open('scripts/data/' + sys.argv[1] + '.csv', 'a') as testFile:
    testFile.write(sys.argv[2] + ',' + sys.argv[3] + '\n')

print('All good!')
# Send output to Node
sys.stdout.flush()
