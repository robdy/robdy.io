const visit = require("unist-util-visit")

module.exports = ({ markdownAST }, pluginOptions) => {
	visit(markdownAST, node => {
		if (node.type === 'html') {
			console.log(node)
			const newText = `
			<section class='codeheader-section'>
					<div class='codeheader flex'>
					<span class='codeheader-language'>powershell</span>
				</div>
			</section>
			${node.value}
			`
			node.value = newText
			return
		}
		return
	})
	return markdownAST
}