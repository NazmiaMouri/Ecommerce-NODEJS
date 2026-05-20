export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // require → import
  root.find(j.VariableDeclaration).forEach(path => {
    const decl = path.value.declarations[0];

    if (
      decl.init &&
      decl.init.callee &&
      decl.init.callee.name === 'require'
    ) {
      const source = decl.init.arguments[0].value;

      if (decl.id.type === 'Identifier') {
        // const x = require('x')
        path.replace(
          j.importDeclaration(
            [j.importDefaultSpecifier(j.identifier(decl.id.name))],
            j.literal(source)
          )
        );
      }

      if (decl.id.type === 'ObjectPattern') {
        // const { a } = require('x')
        path.replace(
          j.importDeclaration(
            decl.id.properties.map(p =>
              j.importSpecifier(j.identifier(p.key.name))
            ),
            j.literal(source)
          )
        );
      }
    }
  });

  return root.toSource();
}