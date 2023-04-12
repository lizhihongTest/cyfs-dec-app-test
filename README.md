# cyfs-dec-app-test
CYFS DEC APP test project

## DEC APP List for Testing

### Nightly Environment

+ dec-app-install-timeout cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNnSN39JEAfMzKs1GFCe5GsPhbRXt49fCnL84A6g : Test for abnormal situation where DEC APP installation time exceeds 15 minutes.
+ dec-app-service-run-exception cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNnXXT3CBoCZk2UPwrC2ppaXnCveQtFS47wFYBvE : Test for exceptions thrown during the running process of the DEC APP service.
+ dec-app-install-syntax-error cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNn9cXGT58bn8c4YngfuBSSvzJnsnoz25uTvfqqk : Test for scenarios where there are syntax errors in the DEC APP service code.
+ dec-app-uninstall-remove-occupied cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNnH1nXE3Ku2CgrQuc3JggtJuvAM3sP3Ype33qSv :DEC APP will create a file with read-only permission to prevent it from being deleted. This simulates the problem of a file being occupied during the uninstallation process.

### Beta Environment
