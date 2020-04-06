const depMapExpressionQuery = geneId => ({
	from: 'Gene',
	select: [
		'depMapExpression.depMapID.DepMapID',
		'depMapExpression.depMapID.Lineage',
		'depMapExpression.depMapID.Disease',
		'depMapExpression.DepmapExpressionValue'
	],
	orderBy: [
		{
			path: 'depMapExpression.depMapID.Disease',
			direction: 'ASC'
		}
	],
	where: [
		{
			path: 'Gene.id',
			op: '=',
			value: geneId
		}
	]
});

function queryData(geneId, serviceUrl, imjsClient = imjs) {
	return new Promise((resolve, reject) => {
		const service = new imjsClient.Service({ root: serviceUrl });
		service
			.records(depMapExpressionQuery(geneId))
			.then(data => {
				if (data && data.length) resolve(data[0]);
				else reject('No data found!');
			})
			.catch(reject);
	});
}

export default queryData;