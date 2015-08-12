print 'start'
url_list=url_spider(test_url)
print 'Spider site ok,find %s url!\ninject test now ...'%len(url_list)
for inject_url_tmp in url_list:
	inject_url='http://%s/%s'%(test_url,inject_url_tmp)
	inject_test.test_it(inject_url)
print 'end'