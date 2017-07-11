# Author: Bing Steup <bingsteup at gmail dot com>
# License: BSD 3 clause

import sys
from sklearn.externals import joblib
from sklearn import datasets, svm, metrics

classifier = joblib.load('scripts/data/' + sys.argv[1] + '.pkl')
prediction = classifier.predict([sys.argv[2].split(',')])
print(prediction[0], end="")

# Send output to Node
sys.stdout.flush()
