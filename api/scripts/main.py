# Author: Bing Steup <bingsteup at gmail dot com>
# License: BSD 3 clause

import csv
from sklearn.externals import joblib
from sklearn import datasets, svm, metrics

# Get set from csv
X = []
y = []
with open('data/testset.csv') as f:
  cf = csv.reader(f)
  for row in cf:
    y.append(row.pop(0))
    X.append(row)

# Create a classifier: a support vector classifier
classifier = svm.SVC(gamma=0.001)
classifier.fit(X, y)

# Print stats from test set
counts = [0] * 10
for index, val in enumerate(y):
  counts[int(val)] = counts[int(val)] + 1

for index, val in enumerate(counts):
  print('%s\t%s\t%s%%' % (index, val, str(round(val / len(y) * 100, 2))))

# Persist
joblib.dump(classifier, 'data/classifier2.pkl')
