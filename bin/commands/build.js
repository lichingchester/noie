'use strict';

const logger = require('../logger');
const config = require('../_config');
const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');
const frontMatter = require('front-matter');
const ejs = require('ejs');

const build = () => {
    logger.info('Building site...');

    // used for count building time
    const startTime = process.hrtime();

    // build settings
    const { srcPath, outputPath, cleanUrls, site } = config.build;

    // empty the output folder
    fse.emptyDirSync(outputPath);

    // copy assets folder
    if (fse.existsSync(`${srcPath}/assets`)){
        fse.copySync(`${srcPath}/assets`, outputPath);
    }

    // read pages
    const files = glob.sync('**/*.@(html|ejs)', { cwd: `${srcPath}/pages` });

    files.forEach(file => buildPage(file, { srcPath, outputPath, cleanUrls, site }));

    // display build time
    const timeDiff = process.hrtime(startTime);
    const duration = timeDiff[0] * 1000 + timeDiff[1] / 1e6;
    logger.success(`Site build successfully in ${duration}ms`);
    
}

// build a single page
const buildPage = (file, { srcPath, outputPath, cleanUrls, site}) => {
    const fileData = path.parse(file);

    // The path.join() method joins the specified path segments into one path.
    let destPath = path.join(outputPath, fileData.dir);

    // create extra dir if generating clean urls and filename is not index
    if(cleanUrls && fileData.name !== 'index'){
        destPath = path.join(destPath, fileData.name);
    }

    // create destination directory
    fse.mkdirsSync(destPath);

    // read page file
    const data = fse.readFileSync(`${srcPath}/pages/${file}`, 'utf-8');

    // render page
    const pageData = frontMatter(data);
    const templateConfig = {
        site,
        page: pageData.attributes
    };

    let pageContent;
    const pageSlug = file.split(path.sep).join('-');

    // generate page content according to file type
    switch(fileData.ext){
        case '.ejs':
            pageContent = ejs.render(pageData.body, templateConfig, {
                filename: `${srcPath}/page-${pageSlug}`
            });
            break;
        default:
            // html
            pageContent = pageData.body;
    }

    // render layout with page contents
    const layoutName = pageData.attributes.layout || 'default';
    const layout = loadLayout(layoutName, {
        srcPath
    });

    // render page with layout
    const completePage = ejs.render(
        layout.data,
        Object.assign({}, templateConfig, {
            body: pageContent,
            filename: `${srcPath}/layout-${layoutName}`
        })
    );

    // save the html file
    if(cleanUrls){
        fse.writeFileSync(`${destPath}/index.html`, completePage);
    }else{
        fse.writeFileSync(`${destPath}/${fileData.name}.html`, completePage);
    }

    // logger.debug({ fileData, srcPath, outputPath, cleanUrls, site });
}

// loads layout file
const loadLayout = (layout, { srcPath }) => {
    const file = `${srcPath}/layouts/${layout}.ejs`;
    const data = fse.readFileSync(file, 'utf-8');

    return { file, data };
};

module.exports = build;